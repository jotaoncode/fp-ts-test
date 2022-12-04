"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingPipe2 = exports.testingPipe1 = exports.populateF = exports.populateE = exports.populateD = exports.populateC = void 0;
const RTE = __importStar(require("fp-ts/lib/ReaderTaskEither"));
const TE = __importStar(require("fp-ts/lib/TaskEither"));
const function_1 = require("fp-ts/lib/function");
const populateC = ({ a, b }) => ({}) => ({ fetch }) => {
    return (0, function_1.pipe)(TE.right(`${a} + ${b}`));
};
exports.populateC = populateC;
const populateD = ({ b }) => ({ c }) => ({ fetch }) => {
    return (0, function_1.pipe)(TE.right(`${c} + ${b}`));
};
exports.populateD = populateD;
const populateE = ({}) => ({}) => ({ fetch }) => {
    return (0, function_1.pipe)(TE.right(`is only a verification`));
};
exports.populateE = populateE;
const populateF = ({}) => ({}) => ({ fetch }) => {
    return (0, function_1.pipe)(TE.right(`this is just a verficiation case`));
};
exports.populateF = populateF;
const testingPipe1 = (data) => (0, function_1.pipe)(RTE.ask(), RTE.bindTo('deps'), RTE.bindW('c', (0, exports.populateC)(data)), RTE.bindW('d', (0, exports.populateD)(data)), RTE.bindW('e', (0, exports.populateE)(data)), RTE.bindW('X', (ctx) => RTE.fromTaskEither(TE.right(`${JSON.stringify(ctx)} : so this is the ctx`))), RTE.bindW('f', (ctx) => (0, exports.populateF)(data)(ctx)));
exports.testingPipe1 = testingPipe1;
const testingPipe2 = (data) => (0, function_1.pipe)(RTE.ask(), RTE.bindTo('deps'), RTE.bindW('c', (0, exports.populateC)(data)), RTE.bindW('d', (0, exports.populateD)(data)), RTE.bindW('e', (a) => (0, exports.populateE)(data)(a)), RTE.bindW('X', (ctx) => RTE.fromTaskEither(TE.right(`${JSON.stringify(ctx)} : so this is the ctx`))), RTE.bindW('f', (ctx) => (0, exports.populateF)(data)(ctx)));
exports.testingPipe2 = testingPipe2;
const result = (0, exports.testingPipe1)({ a: '1', b: 2 });
console.log('this is the first result');
result({ fetch })().then(console.log).catch(console.error);
const result2 = (0, exports.testingPipe2)({ a: '1', b: 2 });
console.log('this is the second result');
result2({ fetch })().then(console.log).catch(console.error);
