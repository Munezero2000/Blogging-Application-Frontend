export function shortStory(text) {
   
    const words = text.split(" ");

    let charCount = 0;

    const displayWords = [];

    for (const word of words) {
        charCount += word.length + 1;

        if (charCount <= 65) {
            displayWords.push(word);
        } else {
            break;
        }
    }

    let truncatedText = displayWords.join(" ");

    if (text.length > 65) {
        truncatedText += "...";
    }
    return truncatedText;
}
export function shortTitle(title) {
    if (title.length >= 45) {
        return title.substring(0, 45) + "...";
    } else {
        let remainingChars = 45 - title.length;
        return title + ".".repeat(remainingChars) + "...";
    }
}

