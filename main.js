'use strict';

const obsidian = require('obsidian');

module.exports = class DeleteWordPlugin extends obsidian.Plugin {
    async onload() {
        // Delete word forward
        this.addCommand({
            id: 'delete-word-forward',
            name: 'Delete word forward',
            editorCallback: (editor) => {
                const cursor = editor.getCursor();
                const line = editor.getLine(cursor.line);
                const text = line.slice(cursor.ch);
                
                const match = text.match(/^\s*\S+\s*/);
                if (match) {
                    const deleteLength = match[0].length;
                    editor.replaceRange(
                        '',
                        cursor,
                        {line: cursor.line, ch: cursor.ch + deleteLength}
                    );
                }
            }
        });

        // Delete word backward
        this.addCommand({
            id: 'delete-word-backward',
            name: 'Delete word backward',
            editorCallback: (editor) => {
                const cursor = editor.getCursor();
                const line = editor.getLine(cursor.line);
                const text = line.slice(0, cursor.ch);
                
                const match = text.match(/\s*\S+\s*$/);
                if (match) {
                    const deleteLength = match[0].length;
                    editor.replaceRange(
                        '',
                        {line: cursor.line, ch: cursor.ch - deleteLength},
                        cursor
                    );
                }
            }
        });
    }
}