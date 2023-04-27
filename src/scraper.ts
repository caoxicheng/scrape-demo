import axios from 'axios';
import cheerio from 'cheerio';

interface ScrapedData {
    title: string
    link: string
}

async function fetchHTML(url: string): Promise<string> {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(`Error fetching HTML from ${url}:`, error);
        return ''
    }
}

function extractDataFromHTML(html: string, target: string = 'a'): ScrapedData[] {
    const $ = cheerio.load(html);
    const scrapedData: ScrapedData[] = [];

    // 选取要抓取的元素,这里以 <a> 标签为例
    $(target).each((_index, element) => {
        const _element = $(element);

        scrapedData.push({ title: _element.text(), link: _element.attr('href') || '' });
    })

    return scrapedData;
}

export async function scrapeWebsite(url: string, targetName: string): Promise<ScrapedData[]> {
    const html = await fetchHTML(url);
    return extractDataFromHTML(html, targetName);
}
