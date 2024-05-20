function formatText(command) {
    document.execCommand(command, false, null);
}

function changeFontSize(action) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedContent = range.extractContents();
        let currentElement = selectedContent.firstChild;

        if (currentElement.nodeType === Node.TEXT_NODE) {
            currentElement = document.createElement('span');
            currentElement.appendChild(selectedContent);
        }

        const currentTag = currentElement.tagName.toLowerCase();
        let newElement;

        if (action === 'increase') {
            if (currentTag === 'span' || currentTag === 'h3') {
                newElement = document.createElement('h2');
            } else if (currentTag === 'h2') {
                newElement = document.createElement('h1');
            } else if (currentTag === 'h1') {
                newElement = document.createElement('h1');
            } else {
                newElement = document.createElement('h3');
            }
        } else if (action === 'decrease') {
            if (currentTag === 'h1') {
                newElement = document.createElement('h2');
            } else if (currentTag === 'h2') {
                newElement = document.createElement('h3');
            } else if (currentTag === 'h3') {
                newElement = document.createElement('span');
            } else {
                newElement = document.createElement('span');
            }
        }

        while (currentElement.firstChild) {
            newElement.appendChild(currentElement.firstChild);
        }

        range.insertNode(newElement);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}