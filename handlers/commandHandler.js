//Create a function which is used in the main file
function loadCommands(client) {
    //requier the libraries
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Commands', 'Status');


    //create a new array
    let commandsArray = [];

    //read the commands directory
    const commandsFolder = fs.readdirSync('./commands');
    //for each folder inside "command" read the files
    for(folder of commandsFolder) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));

        //for each file in the folders add it to the commandFile variable
        for(file of commandFiles) {
            const commandFile = require(`../commands/${folder}/${file}`);
            

            //read the parameters of the command and the data
            const properties = { folder, ...commandFile };
            //set the collection in the main file with each command name and all the data and parameters
            client.commands.set(commandFile.data.name, properties);

            //push the json of the data of each command to the array
            commandsArray.push(commandFile.data.toJSON());

            //add each file to the table
            table.addRow(file, "Loaded");
            continue;
        }
    }

    //add all the commands from the array to the bots application
    client.application.commands.set(commandsArray);

    //return the table
    return console.log(table.toString(), "\nLoaded Commands");
}

//export the function

module.exports = {loadCommands}