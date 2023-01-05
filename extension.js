// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log("Remindr is now activated");

	let addRecurringReminder = vscode.commands.registerCommand('remindr.addRecurringReminder', function () {
		vscode.window.showInputBox({ title: "Name", placeHolder: "Stretch", prompt: "What is the Reminder's Name?" }).then((name) => {
			if (name == null || name == "") { return; }
			vscode.window.showInputBox({ title: "Reminder", placeHolder: "It's time to stand-up and stretch!", prompt: "What do you want to be reminded of?" }).then((reminder) => {
				if (reminder == null || reminder == "") { return; }
				vscode.window.showInputBox({ title: "Interval", placeHolder: "20m", prompt: "How often do you want to be reminded?" }).then((interval) => {
					if (interval == null || reminder == "") { return; }

					// TODO: Create the actual Reminder
					vscode.window.showInformationMessage(`Created ${name} reminder. You will be reminded every ${interval}`);
				})
			})
		});
	});

	let removeReminder = vscode.commands.registerCommand('remindr.removeReminder', function () {
		vscode.window.showInformationMessage("Not Implemented");
	})

	context.subscriptions.push(addRecurringReminder);
	context.subscriptions.push(removeReminder);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
