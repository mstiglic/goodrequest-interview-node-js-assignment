import passport from 'passport';
import {
    Strategy as JwtStrategy,
    ExtractJwt
} from 'passport-jwt';
import { models } from '~db/sequelize';
import { ENV_CONFIG } from '~lib/env';
import type { TUserJwtTokenPayload } from '~lib/auth/jwt';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ENV_CONFIG.JWT_SECRET,
};

passport.use(new JwtStrategy(
    opts,
    async (jwt_payload: TUserJwtTokenPayload, done) => {
        try {
            const user = await models.User.findByPk(jwt_payload.id);
            if (!user) {
                return done(null, undefined);
            }

            return done(null, user);
        } catch (err) {
            return done(err, undefined);
        }
    })
);

export default passport;

