<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;

class NewsController extends Controller
{
    public function index(Request $request)
{
    $query = Article::query();

    // 🔍 Search by keyword
    if ($request->filled('search')) {
        $query->where(function ($q) use ($request) {
            $q->where('title', 'like', '%' . $request->search . '%')
              ->orWhere('description', 'like', '%' . $request->search . '%');
        });
    }

    // 📰 Filter by source
    if ($request->filled('source')) {
        $query->where('source', $request->source);
    }

    // 📚 Filter by category
    if ($request->filled('category')) {
        $query->where('category', $request->category);
    }

    // 📅 Filter by published date range
    if ($request->filled('date_from')) {
        $query->whereDate('published_at', '>=', $request->date_from);
    }

    if ($request->filled('date_to')) {
        $query->whereDate('published_at', '<=', $request->date_to);
    }

    // Return filtered articles, newest first
    return response()->json($query->latest()->get());
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'url' => 'required|url',
        ]);

        $article = Article::create($validated);
        return response()->json($article, 201);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->json(['message' => 'Article deleted']);
    }

    public function filters()
{
    $sources = Article::select('source')->whereNotNull('source')->distinct()->pluck('source');
    $categories = Article::select('category')->whereNotNull('category')->distinct()->pluck('category');

    return response()->json([
        'sources' => $sources,
        'categories' => $categories,
    ]);
}

}
