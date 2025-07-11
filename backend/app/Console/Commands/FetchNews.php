<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Article;

class FetchNews extends Command
{
    protected $signature = 'fetch:news';
    protected $description = 'Fetch news articles from external APIs';

    public function handle()
    {
        $this->info('Fetching news...');

        $newsApiKey = env('NEWS_API_KEY');
        $url = "https://newsapi.org/v2/top-headlines?country=us&apiKey={$newsApiKey}";

        $response = Http::get($url);

        if ($response->successful()) {
            $articles = $response->json()['articles'];

            foreach ($articles as $article) {
                Article::updateOrCreate(
                    ['title' => $article['title']],
                    [
                        'description' => $article['description'],
                        'url' => $article['url'],
                        'source' => $article['source']['name'] ?? 'Unknown',
                        'category' => 'general', 
                        'published_at' => isset($article['publishedAt']) 
                            ? date('Y-m-d H:i:s', strtotime($article['publishedAt'])) 
                            : now(),
                    ]
                );
            }

            $this->info("Fetched and stored " . count($articles) . " articles.");
        } else {
            $this->error("Failed to fetch news: " . $response->status());
        }
    }
}
