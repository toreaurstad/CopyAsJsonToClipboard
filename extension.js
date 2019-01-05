// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const clipboardy = require('clipboardy');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {



	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copyasjsontoclipboard" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.copyJsonToClipboard', function () {
		// The code you place here will be executed every time your command is executed

		let currentSelection = vscode.window.activeTextEditor.selection;
		if (!currentSelection.isEmpty) {
			let text = vscode.window.activeTextEditor.document.getText(currentSelection);
			try {
				vscode.window.showInformationMessage('JSON.stringify of text: ' + JSON.stringify(text));
			}
			catch (error) {
				vscode.window.showErrorMessage('The parsing to Json failed: ' + error);
			}
			vscode.window.showInformationMessage('Selected text is: ' + text);
			clipboardy.write(text);
		}
		else {
			vscode.window.showInformationMessage('Select text first in an open document to copy as json to clipboard!');
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
