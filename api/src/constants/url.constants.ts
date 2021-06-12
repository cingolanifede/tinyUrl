import config from "../config"

export const MONGO = {
    url: `mongodb://${config.DB_PATH}:27017/Url`,
    configuration: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
}
