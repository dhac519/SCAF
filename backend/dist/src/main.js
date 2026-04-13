"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let cachedApp;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('DHAC API')
        .setDescription('The DHAC Financial System API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, documentFactory);
    await app.init();
    return app;
}
exports.default = async (req, res) => {
    try {
        if (!cachedApp) {
            cachedApp = await bootstrap();
        }
        const server = cachedApp.getHttpAdapter().getInstance();
        server(req, res);
    }
    catch (err) {
        console.error('ERROR EN VERCEL:', err.message);
        res.status(500).send('Error interno del servidor en Vercel');
    }
};
if (process.env.NODE_ENV !== 'production') {
    bootstrap().then((app) => {
        const port = process.env.PORT ?? 4000;
        app.listen(port).then(() => {
            console.log(`Server running on http://localhost:${port}`);
        });
    });
}
//# sourceMappingURL=main.js.map