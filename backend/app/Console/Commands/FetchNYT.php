<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchNYT extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:nyt';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
   public function handle()
{
    $this->info('Fetching articles from New York Times...');

    $apiKey = env('NYT_API_KEY');
    $url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key={$apiKey}";

    $response = Http::get($url);

    if ($response->successful()) {
        $articles = $response->json()['results'];

        foreach ($articles as $article) {
            \App\Models\Article::updateOrCreate(
                ['title' => $article['title']],
                [
                    'description' => $article['abstract'],
                    'url' => $article['url'],
                    'source' => 'New York Times',
                    'category' => $article['section'] ?? 'general',
                    'published_at' => \Carbon\Carbon::parse($article['published_date']),
                ]
            );
        }

        $this->info('NYT articles fetched and saved.');
    } else {
        $this->error('Failed to fetch NYT news: ' . $response->status());
    }
}
}
