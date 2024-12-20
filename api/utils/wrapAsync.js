// module.exports = (fn) => {
//     return (req, res, next) =>{
//         fn(req, res, next).catch((err) => next(err));
//     };
// };

// wrapAsync.js
export default function wrapAsync(fn) {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    };
}
