import winston from 'winston';
import chalk from 'chalk';
import type morgan from 'morgan';
import type * as http from 'http';
import { format } from 'date-fns/format';

export const getLoggerMorganFormattedOutput:
    morgan.FormatFn<
        http.IncomingMessage,
        http.ServerResponse
    > = (
        tokens,
        req,
        res,
    ) => {
        const statusCode: number = +(tokens?.status(req, res) || 0);
        const httpMethod = tokens.method(req, res) || '';

        const formattedStatus = {
            [statusCode]: statusCode,
            ...(statusCode >= 100 && { [statusCode]: chalk.blue.bold(statusCode) }),
            ...(statusCode >= 200 && { [statusCode]: chalk.green.bold(statusCode) }),
            ...(statusCode >= 300 && { [statusCode]: chalk.yellow.bold(statusCode) }),
            ...(statusCode >= 400 && { [statusCode]: chalk.red.bold(statusCode) }),
            ...(statusCode >= 500 && { [statusCode]: chalk.redBright.bold(statusCode) }),
        };

        const formattedHttpMethod: Record<string, any> = {
            httpMethod,
            GET: chalk.blueBright.bold(httpMethod),
            POST: chalk.greenBright.bold(httpMethod),
            PUT: chalk.yellow.bold(httpMethod),
            PATCH: chalk.yellowBright.bold(httpMethod),
            DELETE: chalk.red.bold(httpMethod),
            HEAD: chalk.green.bold(httpMethod),
            OPTIONS: chalk.blue.bold(httpMethod),
        };

        function getResultLine(label: string, ...result: Array<string>): string {
            return [
                chalk.white(label),
                '=',
                result.join(''),
            ].join('');
        }

        return [
            `${chalk.white.bold(format(new Date(), 'dd.MM.yyyy HH:mm:ss:SSS'))}`,
            `[HTTP - ${formattedHttpMethod[httpMethod]}]`,
            `[${formattedStatus[statusCode]}]`,
            getResultLine('RESPONSE_TIME', tokens['response-time'](req, res) || '', 'ms'),
            getResultLine('HTTP', tokens['http-version'](req, res) || ''),
            getResultLine('REMOTE_ADDR', tokens['remote-addr'](req, res) || ''),
            getResultLine('REMOTE_USER', tokens['remote-user'](req, res) || ''),
            getResultLine('URL', tokens.url(req, res) || ''),
            getResultLine('CONTENT_LENGTH', tokens.res(req, res, 'content-length') || ''),
            getResultLine('REFERRER', tokens.referrer(req, res) || ''),
            getResultLine('USER_AGENT', tokens['user-agent'](req, res) || ''),
        ].join(' ');
    };

function getLoggerCliFormattedOutput(
    {
        level, message
    }: { level: string, message: unknown },
): string {
    const levelFormats = {
        [level]: level.toUpperCase(),
        info: chalk.blue.bold(level.toUpperCase()),
        warn: chalk.yellow.bold(level.toUpperCase()),
        error: chalk.red.bold(level.toUpperCase()),
        debug: chalk.gray.bold(level.toUpperCase()),
    };

    return [
        chalk.white.bold(format(new Date(), 'dd.MM.yyyy HH:mm:ss:SSS')),
        `[${levelFormats[level]}]`,
        message,
    ].join(' ');
}

export const loggerCli = winston.createLogger({
    // Same NPM logging levels as was default, but custom sorted
    // https://www.npmjs.com/package/winston#logging-levels

    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
        verbose: 4,
        http: 5,
        silly: 6,
    },
    format: winston.format.combine(
        winston.format.printf(getLoggerCliFormattedOutput),
    ),
    transports: [new winston.transports.Console({ level: 'debug' }),],
});
