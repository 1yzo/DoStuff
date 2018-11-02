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
            const payload = await res.json();
            if (Object.keys(payload).length) return payload ;
        } catch (e) {
            console.log(e);
        }
    }
};

export const shortenText = (text, limit) => {
    if (text.length > limit) {
        return text.slice(0, limit) + '...';
    }
}