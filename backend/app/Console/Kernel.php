<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Console\Commands\ScrapeNews;
use App\Console\Commands\FetchNews; 

class Kernel extends ConsoleKernel
{
    protected $commands = [
        ScrapeNews::class,
        FetchNews::class, 
    ];

    protected function schedule(Schedule $schedule)
    {
        // Schedule to run every hour
        $schedule->command('news:scrape')->hourly();
        $schedule->command('fetch:news')->hourly();

    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
    }
}
