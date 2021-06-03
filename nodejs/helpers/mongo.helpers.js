const removeNewlines = (aliases) => {
    if (aliases === null || aliases === '') return false;

    return aliases.split(/\r\n|\r|\n/);
};

const removeTags = (description) => {
    if (description === null || description === '') return false;

    return description.replace( /(<([^>]+)>)/ig, '');
};

export {
    removeNewlines,
    removeTags,
};
