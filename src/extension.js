
const vscode = require('vscode');
const { RecurringReminder } = require('./classes/RecurringReminder');

/**
 * @description Converts a string like 1h23m5s to a number in seconds
 * @param { String } stringToParse The string to create a time value from
 * @returns { number } The number in seconds
 */
function parseTime(stringToParse)
{
    if (stringToParse == undefined || stringToParse.length <= 0) { console.log("Nothing was put in"); return 0; }

    var units = {'h': 3600, 'm': 60, 's': 1};
	var regex = /(\d+)([hms])/g;

	let seconds = 0;
	var match;
	while ((match = regex.exec(stringToParse))) 
	{
		seconds += parseInt(match[1]) * units[match[2]];
	}

	return seconds;
}

/**
 * @description Gets all of the current Reminders. If there is no Reminders object, create one.
 * @param {vscode.ExtensionContext} context The context to access globalState from
 * @returns { Object.<string, RecurringReminder> } A dictionary of RecurringReminders
 */
function getReminders(context) {
	var reminders = context.globalState.get("Reminders");

	if (reminders == undefined) {
		context.globalState.update("Reminders", "{}");
	}

	return context.globalState.get("Reminders");
}

/**
 * @description Looks in the ExtensionContex.globalState.Reminders 
 * @param {vscode.ExtensionContext} context The context to access globalState from
 * @param {string} name The name of the Reminder to look up
 * @param { boolean? } returnBoolean When set to false this function returns a RecurringReminder, if set to true it returns a boolean
 * @returns { RecurringReminder } Returns a RecurringReminder if returnBoolean is false 
 * @returns { boolean } Returns boolean if returnBoolean is true
 */
function getReminderByName(context, name, returnBoolean = false) {
	let reminders = getReminders(context)
	let reminder = reminders[name]

	if (reminder)
	{
		return returnBoolean ? true : reminder;
	} else {
		return returnBoolean ? false : undefined
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let addRecurringReminder = vscode.commands.registerCommand('remindr.addRecurringReminder', function () {
		vscode.window.showInputBox({ title: "Reminder Name", placeHolder: "Stretch", prompt: "What is the Reminder's Name?" }).then((name) => {
			if (name == null || name == "") { return; }

			// TODO: make sure this name doesn't already exist
			let alreadyExists = getReminderByName(context, name, true);
			if (alreadyExists == true) { vscode.showInformationMessage(`A reminder with the name ${name} already exists!`); return; };

			vscode.window.showInputBox({ title: "Reminder", placeHolder: "It's time to stand-up and stretch!", prompt: "What do you want to be reminded of?" }).then((reminder) => {
				if (reminder == null || reminder == "") { return; }
				vscode.window.showInputBox({ title: "Interval", placeHolder: "20m", prompt: "How often do you want to be reminded?" }).then((interval) => {
					if (interval == null || reminder == "") { return; }
					console.log(interval);
					parsedInterval = parseTime(interval);
					if (parsedInterval == 0) { console.log("Failure: " + parsedInterval); return; }

					console.log("Success: " + parsedInterval);

					// TODO: Parse Interval before actually making the reminder
					// context.globalState.update(name, JSON.stringify({message: reminder, interval: interval}))
					// TODO: Create the actual Reminder
					vscode.window.showInformationMessage(`Created ${name} reminder. You will be reminded every ${interval}`);
				})
			})
		});
	});

	let removeReminder = vscode.commands.registerCommand('remindr.removeReminder', function () {
		vscode.window.showInputBox({ title: "Reminder Name", prompt: "Give the name of a Reminder that you would like to remove" }).then((name) => {
			context.globalState.update(name, undefined);
		})
	})

	let getReminder = vscode.commands.registerCommand('remindr.inspectReminder', function () {
		vscode.window.showInputBox({ title: "Reminder Name", prompt: "Give the name of a Reminder that you would like to inspect" }).then((name) => {
			vscode.window.showInformationMessage(context.globalState.get(name));
		})
	})

	context.subscriptions.push(addRecurringReminder);
	context.subscriptions.push(getReminder)
	context.subscriptions.push(removeReminder);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
