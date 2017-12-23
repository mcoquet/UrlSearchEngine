'use strict';

var R = require('request-promise');
var log = require('fancy-log');
var PouchDB = require('pouchdb');
var toid = require('to-id');
var _ = require('lodash');
var Hapi = require('hapi');
var Joi = require('joi');
var base64Img = require('base64-img');
var env = require('./envvars.js');
var dbPost = require('./db/post.js');
var dbRemove = require('./db/remove.js');
var dbSearch = require('./db/search.js');
var dbBookmark= require('./db/bookmark.js');

const server = new Hapi.Server();
server.connection({ port: env.SERVER_PORT });

server.route([
    {
        method: 'POST',
        path: '/url',
        config: dbPost.postUrlConfig
    },
    {
        method: 'DELETE',
        path: '/remove/{docid}',
        config: dbRemove.removeConfig
    },
    {
        method: 'GET',
        path: '/search/{searchwords}',
        config: dbSearch.searchConfig
    },
    {
        method: 'POST',
        path: '/bookmarks',
        config: dbBookmark.config
    },
]);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
