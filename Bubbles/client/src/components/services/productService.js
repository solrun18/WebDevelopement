const fetchAllBubbles= () => {
    return fetch('http://localhost:3500/api/bubbles').then(resp => {
        if(resp.ok) { return resp.json(); }
    }).then(data => {
        if(!data) { data = [] };
        return data;
    });
};

const fetchAllBundles = () => {
    return fetch('http://localhost:3500/api/bundles').then(resp => {
        if(resp.ok) { return resp.json(); }
    }).then(data => {
        if(!data) { data = [] };
        return data;
    });
};

const fetchBubble = (bubbleId) => {
    return fetch(`http://localhost:3500/api/bubbles/${bubbleId}`).then(resp => {
        if(resp.ok) { return resp.json(); }
    }).then(data => {
        if(!data) { data = [] };
        return data;
    });
}

export default {
    fetchAllBubbles,
    fetchAllBundles,
    fetchBubble
};