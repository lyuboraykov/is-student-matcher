// Generated by typings
// Source: https://raw.githubusercontent.com/nashika/typed-csv-parse/b300d8674f93cfd70a02e5c45354d980a7179a2e/lib/sync.d.ts
declare module '~csv-parse/lib/sync' {
import parseOriginal = require('csv-parse');

function parse(data:string, options?:parseOriginal.ICsvParseOpts):parseOriginal.CsvParseResultType;

export = parse;
}
declare module 'csv-parse/lib/sync' {
import main = require('~csv-parse/lib/sync');
export = main;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/nashika/typed-csv-parse/b300d8674f93cfd70a02e5c45354d980a7179a2e/index.d.ts
declare module 'csv-parse' {
namespace parse {

  interface ICsvParseOpts {

    /**
     * Set the field delimiter. One character only, defaults to comma.
     */
    delimiter?:string;

    /**
     * String used to delimit record rows or a special value;
     * special constants are 'auto', 'unix', 'mac', 'windows', 'unicode';
     * defaults to 'auto' (discovered in source or 'unix' if no source is specified).
     */
    rowDelimiter?:string;

    /**
     * Optionnal character surrounding a field, one character only, defaults to double quotes.
     */
    quote?:string;

    /**
     * Set the escape character, one character only, defaults to double quotes.
     */
    escape?:string;

    /**
     * List of fields as an array,
     * a user defined callback accepting the first line and returning the column names or true
     * if autodiscovered in the first CSV line,
     * default to null,
     * affect the result data set in the sense that records will be objects instead of arrays.
     */
    columns?:Array<string>|boolean|Function;

    /**
     * Treat all the characters after this one as a comment, default to '' (disabled).
     */
    comment?:string;

    /**
     * Name of header-record title to name objects by.
     */
    objname?:string;

    /**
     * Preserve quotes inside unquoted field.
     */
    relax?:boolean;

    /**
     * Dont generate empty values for empty lines.
     */
    skip_empty_lines?:boolean;

    /**
     * If true, ignore whitespace immediately around the delimiter, defaults to false. Does not remove whitespace in a quoted field.
     */
    trim?:boolean;

    /**
     * If true, ignore whitespace immediately following the delimiter (i.e. left-trim all fields), defaults to false. Does not remove whitespace in a quoted field.
     */
    ltrim?:boolean;

    /**
     * If true, ignore whitespace immediately preceding the delimiter (i.e. right-trim all fields), defaults to false. Does not remove whitespace in a quoted field.
     */
    rtrim?:boolean;

    /**
     * If true, the parser will attempt to convert read data types to native types.
     */
    auto_parse?:boolean;

    /**
     * If true, the parser will attempt to convert read data types to dates. It requires the "auto_parse" option.
     */
    auto_parse_date?:boolean;

  }

  type CsvParseResultType = Array<Array<any>>|Array<{[key:string]:any}>;

  type CsvParseCallbackType = (err:Error, output:CsvParseResultType)=>void;

  interface CsvParser extends NodeJS.ReadWriteStream {

    // Parser stream takes array of strings
    write(data:string):boolean;

    // repeat declarations from NodeJS.WritableStream to avoid compile error
    write(buffer:Buffer, cb?:Function):boolean;
    write(str:string, cb?:Function):boolean;
    write(str:string, encoding?:string, cb?:Function):boolean;
  }

}

function parse(data:string, options:parse.ICsvParseOpts, callback:parse.CsvParseCallbackType):void;
function parse(data:string, callback:parse.CsvParseCallbackType):void;
function parse(options?:parse.ICsvParseOpts):parse.CsvParser;
function parse(dataOrOptions:string|parse.ICsvParseOpts, optionsOrCallback?:parse.ICsvParseOpts|parse.CsvParseCallbackType, callback?:parse.CsvParseCallbackType):void|parse.CsvParser;

export = parse;
}
