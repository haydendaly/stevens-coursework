let [count, bodies, urlObj]= [0, [], {}];

const countReq = (req, res, next) => {
    count += 1;
    next();
};

const logReq = (req, res, next) => {
    bodies.push(req.body);
    next();
};

const trackURL = (req, res, next) => {
    if (req.originalUrl in urlObj) {
        urlObj[req.originalUrl] = urlObj[req.originalUrl] + 1;
    } else {
        urlObj[req.originalUrl] = 1;
    }
    next();
};

const displayReq = (req, res, next) => {
    console.log('\033[1m***************** Request Info *****************\033[0m',
`\nTotal Requests: ${count}
HTTP Request:   ${req.method} ${req.originalUrl}
Path Requests:  ${urlObj[req.originalUrl]}
Request Body:   ${JSON.stringify(req.body, null, '  ')}\n`);
    next();
};

module.exports = {
    countReq,
    logReq,
    trackURL,
    displayReq
};