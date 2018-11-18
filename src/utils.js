export const getListKey = (parentListId) => parentListId.split('-')[0]; // should match with keys in state.lists

export const fadeIn = (element, duration) => {
    element.style.display = 'flex';
    (function increment(value = 0) {
        element.style.opacity = String(value);
        if (element.style.opacity !== '1') {
            setTimeout(() => {
                increment(value + 0.1);
            }, duration / 10);
        }
    })();
};

export const fadeOut = (element, duration) => {
    (function decrement() {
        if ((element.style.opacity -= 0.1) < 0) {
            element.remove()
        } else {
            setTimeout(() => {
                decrement();
            }, duration / 10);
        }
    })();
};

export const findAndReplaceLinks = text => {
    const exp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-=?]*)*\/?$/;
    return text.split(' ').map(word => {
        return word.replace(exp, match => {
            const href = match.includes('htt') ? match : `http://${match}`;
            return `<a href="${href}" target="_blank">${match}</a>`
        });
    }).join(' ');
};

export const getLinkPreview = async text => {
    const exp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-=?]*)*\/?$/;
    const links = text.split(' ').filter(word => exp.test(word));
    if (links.length) {
        const link = links[0].includes('htt') ? links[0] : `http://${links[0]}`;
        try {
            const res = await fetch(`http://localhost:3000/api/link_preview/?link=${link}`, { method: 'POST' });
            if (res.status !== 500) {
                const payload = await res.json();
                if (Object.keys(payload).length) return payload;
            } else throw new Error('something wrong with link');
        } catch (e) {
            console.log(e);
        }
    }
};

// todo - rename this function
export const mapLinkPreviews = list => {
    const getItemWithPreview = (item) => new Promise(resolve => {
        getLinkPreview(item.title).then((preview) => {
            resolve({
                ...item,
                linkPreview: preview
            });
        })
    })
    const promises = list.map(item => getItemWithPreview(item));
    return Promise.all(promises);
}

export const shortenText = (text, limit) => {
    if (text.length > limit) {
        return text.slice(0, limit) + '...';
    } else return text;
}

export const getItem = (lists, itemId) => {
    for (let key in lists) {
        for (let item of lists[key]) {
            if (item.id === itemId) {
                return item;
            }
        }
    }
}