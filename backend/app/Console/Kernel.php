<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

// Import all your custom commands
use App\Console\Commands\ScrapeNews;
use App\Console\Commands\FetchNews;
use App\Console\Commands\FetchGuardian;
use App\Console\Commands\FetchNYT;

class Kernel extends ConsoleKernel
{
    /**
     * Register the Artisan commands for the application.
     *
     * @var array
     */
    protected $commands = [
        ScrapeNews::class,
        FetchNews::class,
        FetchGuardian::class,
        FetchNYT::class,
    ];

    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Schedule commands to run hourly
        $schedule->command('news:scrape')->hourly();
        $schedule->command('fetch:news')->hourly();
        $schedule->command('fetch:guardian')->hourly();
        $schedule->command('fetch:nyt')->hourly();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
