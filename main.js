'use strict';

const obsidian = require('obsidian');

module.exports = class WordNavigationPlugin extends obsidian.Plugin {
    async onload() {
        // Move word forward
        this.addCommand({
            id: 'move-word-forward',
            name: 'Move word forward',
            editorCallback: (editor) => {
                const cursor = editor.getCursor();
                const line = editor.getLine(cursor.line);
                const text = line.slice(cursor.ch);
                
                const match = text.match(/^\s*\S+\s*/);
                if (match) {
                    const moveLength = match[0].length;
                    editor.setCursor({
                        line: cursor.line,
                        ch: cursor.ch + moveLength
                    });
                } else if (cursor.line < editor.lineCount() - 1) {
                    // Move to start of next line if at end of current line
                    editor.setCursor({
                        line: cursor.line + 1,
                        ch: 0
                    });
                }
            }
        });

        // Move word backward
        this.addCommand({
            id: 'move-word-backward',
            name: 'Move word backward',
            editorCallback: (editor) => {
                const cursor = editor.getCursor();
                const line = editor.getLine(cursor.line);
                const text = line.slice(0, cursor.ch);
                
                const match = text.match(/\s*\S+\s*$/);
                if (match) {
                    const moveLength = match[0].length;
                    editor.setCursor({
                        line: cursor.line,
                        ch: cursor.ch - moveLength
                    });
                } else if (cursor.line > 0) {
                    // Move to end of previous line if at start of current line
                    editor.setCursor({
                        line: cursor.line - 1,
                        ch: editor.getLine(cursor.line - 1).length
                    });
                }
            }
        });

        // Delete word forward (original)
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

        // Delete word backward (original)
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
