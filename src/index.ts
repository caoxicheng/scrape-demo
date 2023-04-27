import express, { Request, Response} from "express";
import * as process from "process";
import { scrapeWebsite } from "./scraper";

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world');
})

app.get('/scrape', async (req: Request, res: Response) => {
    const url = req.query.url as string;

    if (!url) {
        res.status(400).send('Please provide a URL to scrape as query parameter.');
        return;
    }

    try {
        const data = await scrapeWebsite(url, 'h2 a');
        res.json(data);
    } catch (error) {
        res.status(500).send(`Error scraping website: ${error}`);
    }
})

app.listen(port, () => {
    console.log(`Service is running on port ${port}`);
})
