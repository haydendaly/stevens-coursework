const { object, string, number, array } = require('yup');

const Cast = object().shape({
    firstName: string().required(),
    lastName: string().required()
});

const Info = object().shape({
    director: string().required(),
    yearReleased: number().required().positive().integer().min(1800)
});

const Comment = object().shape({
    name: string().required(),
    comment: string().required()
}).noUnknown(true).strict();

const Movie = object().shape({
    title: string().required(),
    cast: array().required().of(Cast),
    info: Info.required(),
    plot: string().required(),
    rating: number().required().positive().max(5),
}).noUnknown(true).strict();

const CastPatch = object().shape({
    firstName: string(),
    lastName: string()
});

const InfoPatch = object().shape({
    director: string(),
    yearReleased: number().positive().integer().min(1800)
});

const MoviePatch = object().shape({
    title: string(),
    cast: array().of(CastPatch),
    info: InfoPatch,
    plot: string(),
    rating: number().positive().max(5),
}).noUnknown(true).strict();

module.exports = {
    Movie,
    MoviePatch,
    Comment
}