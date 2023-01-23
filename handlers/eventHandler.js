//Create a function which is used in the main file
function loadEvents(client) {
    //requier the libraries
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Events', 'Status');

    //read the events directory
    const folders = fs.readdirSync('./events');

    //for each folder inside "events" read the files
    for(const folder of folders) {
        const files = fs.readdirSync(`./events/${folder}`).filter((file) => file.endsWith('.js'));

        //for each file in the folders add it to the events variable
        for(const file of files) {
            const event = require(`../events/${folder}/${file}`);

            //if the event is rest 
            if(event.rest) {
                //if the event is run once execute the event
                if(event.once) 
                    client.rest.once(event.name, (...args) =>
                        event.execute(...args, client)
                    );
                else
                //if not exectue it anyway
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args,client)
                    );
            } else {
                //if the event isnt rest execute the event
                if(event.once)
                    client.once(event.name, (...args) => event.execute(...args, client))
                else client.on(event.name, (...args) => event.execute(...args, client))
            }
            //add each event to a table
            table.addRow(file, 'Loaded')
            continue;
        }
    }
    //log the table in the console
    return console.log(table.toString(), "\nLoaded Events");
}

//export the function for use in other files
module.exports = {loadEvents}