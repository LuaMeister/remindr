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
		vscode.window.showInformationMessage("Adding Reminder");
	});

	let removeReminder = vscode.commands.registerCommand('remindr.removeReminder', function() {
		vscode.window.showInformationMessage("Removing Reminder")
	})

	context.subscriptions.push(addRecurringReminder);
	context.subscriptions.push(removeReminder);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
