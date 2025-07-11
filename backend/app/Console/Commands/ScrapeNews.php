<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Article;
use Illuminate\Support\Facades\Http;

class ScrapeNews extends Command
{
    protected $signature = 'news:scrape';
    protected $description = 'Scrape news from multiple sources and save to DB';

    public function handle()
    {
        $this->info('Scraping started...');

        $this->fetchFromNewsAPI();
        $this->fetchFromGuardian();
        $this->fetchFromNYT();

        $this->info('Scraping completed!');
    }

    private function fetchFromNewsAPI()
    {
        $apiKey = env('NEWS_API_KEY');
        $response = Http::get("https://newsapi.org/v2/top-headlines?language=en&apiKey=$apiKey");

        if ($response->successful()) {
            foreach ($response['articles'] as $article) {
                Article::updateOrCreate(
                    ['url' => $article['url']],
                    [
                        'title' => $article['title'],
                        'description' => $article['description'],
                        'url' => $article['url'],
                    ]
                );
            }
            $this->info('NewsAPI.org data saved.');
        } else {
            $this->error('Failed to fetch from NewsAPI.org');
        }
    }

    private function fetchFromGuardian()
    {
        $apiKey = env('GUARDIAN_API_KEY');
        $response = Http::get("https://content.guardianapis.com/search?api-key=$apiKey&show-fields=trailText");

        if ($response->successful()) {
            foreach ($response['response']['results'] as $article) {
                Article::updateOrCreate(
                    ['url' => $article['webUrl']],
                    [
                        'title' => $article['webTitle'],
                        'description' => $article['fields']['trailText'] ?? null,
                        'url' => $article['webUrl'],
                    ]
                );
            }
            $this->info('The Guardian data saved.');
        } else {
            $this->error('Failed to fetch from The Guardian');
        }
    }

    private function fetchFromNYT()
    {
        $apiKey = env('NYT_API_KEY');
        $response = Http::get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=$apiKey");

        if ($response->successful()) {
            foreach ($response['results'] as $article) {
                Article::updateOrCreate(
                    ['url' => $article['url']],
                    [
                        'title' => $article['title'],
                        'description' => $article['abstract'],
                        'url' => $article['url'],
                    ]
                );
            }
            $this->info('NYTimes data saved.');
        } else {
            $this->error('Failed to fetch from NYTimes');
        }
    }
}
