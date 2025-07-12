<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchGuardian extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:guardian';

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
    $this->info('Fetching articles from The Guardian...');

    $apiKey = env('GUARDIAN_API_KEY');
    $url = "https://content.guardianapis.com/search?api-key={$apiKey}&show-fields=trailText,short-url";

    $response = Http::get($url);

    if ($response->successful()) {
        $articles = $response->json()['response']['results'];

        foreach ($articles as $article) {
            \App\Models\Article::updateOrCreate(
                ['title' => $article['webTitle']],
                [
                    'description' => $article['fields']['trailText'] ?? null,
                    'url' => $article['webUrl'],
                    'source' => 'The Guardian',
                    'category' => $article['sectionName'] ?? 'general',
                    'published_at' => \Carbon\Carbon::parse($article['webPublicationDate']),
                ]
            );
        }

        $this->info('Guardian articles fetched and saved.');
    } else {
        $this->error('Failed to fetch Guardian news: ' . $response->status());
    }
}

}
