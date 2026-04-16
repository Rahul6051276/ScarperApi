export const NETMIRROR_ENDPOINTS = [
  {
    name: "NetMirror Home",
    method: "GET",
    endpoint: "/api/netmirror",
    provider: "NetMirror",
    description: "Get latest movies and shows from NetMirror homepage with categories",
    requiresAuth: true,
    parameters: [],
    tsExample: `const response = await fetch(\`\${baseUrl}/api/netmirror\`, {
  method: 'GET',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

interface NetMirrorItem {
  id: string;
  title: string;
  imageUrl: string;
  postUrl: string;
  category: string;
}

interface NetMirrorResponse {
  success: boolean;
  data: {
    items: NetMirrorItem[];
    totalResults: number;
  };
}

const data: NetMirrorResponse = await response.json();
console.log(data);`,
    jsExample: `fetch(\`\${baseUrl}/api/netmirror\`, {
  method: 'GET',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    curlExample: `curl -X GET "https://screenscapeapi.dev/api/netmirror" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    responseExample: `{
  "success": true,
  "data": {
    "items": [
      {
        "id": "12345",
        "title": "Breaking Bad",
        "imageUrl": "https://net20.cc/images/...",
        "postUrl": "https://net20.cc/watch/12345",
        "category": "Trending Now"
      }
    ],
    "totalResults": 50
  }
}`,
  },
  {
    name: "NetMirror Search",
    method: "GET",
    endpoint: "/api/netmirror/search",
    provider: "NetMirror",
    description: "Search for movies and shows on NetMirror",
    requiresAuth: true,
    parameters: [{ name: "q", type: "string", required: true, description: "Search query" }],
    tsExample: `const response = await fetch(\`\${baseUrl}/api/netmirror/search?q=\${query}\`, {
  method: 'GET',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

interface NetMirrorSearchResponse {
  success: boolean;
  data: {
    searchUrl: string;
    searchResults?: Record<string, unknown>;
    requestParams: {
      query: string;
      timestamp: string;
    };
  };
}

const data: NetMirrorSearchResponse = await response.json();
console.log(data);`,
    jsExample: `fetch(\`\${baseUrl}/api/netmirror/search?q=\${query}\`, {
  method: 'GET',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    curlExample: `curl -X GET "https://screenscapeapi.dev/api/netmirror/search?q=breaking+bad" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    responseExample: `{
  "success": true,
  "data": {
    "searchUrl": "https://net20.cc/search.php?s=breaking+bad&t=1234567890",
    "searchResults": {
      "results": [
        {
          "id": "12345",
          "title": "Breaking Bad",
          "year": "2008"
        }
      ]
    },
    "requestParams": {
      "query": "breaking bad",
      "timestamp": "1234567890"
    }
  }
}`,
  },
  {
    name: "NetMirror Get Post",
    method: "GET",
    endpoint: "/api/netmirror/getpost",
    provider: "NetMirror",
    description: "Get detailed information about a specific movie or show by ID",
    requiresAuth: true,
    parameters: [
      { name: "id", type: "string", required: true, description: "Movie/show ID" },
      { name: "t", type: "string", required: false, description: "Timestamp (auto-generated if not provided)" },
    ],
    tsExample: `const response = await fetch(\`\${baseUrl}/api/netmirror/getpost?id=\${id}\`, {
  method: 'GET',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

interface NetMirrorPostResponse {
  success: boolean;
  data?: Record<string, unknown>;
  requestParams?: {
    id: string;
    timestamp: string;
  };
}

const data: NetMirrorPostResponse = await response.json();
console.log(data);`,
    jsExample: `fetch(\`\${baseUrl}/api/netmirror/getpost?id=\${id}\`, {
  method: 'GET',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    curlExample: `curl -X GET "https://screenscapeapi.dev/api/netmirror/getpost?id=12345" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    responseExample: `{
  "success": true,
  "data": {
    "id": "12345",
    "title": "Breaking Bad",
    "description": "A high school chemistry teacher...",
    "rating": "9.5",
    "year": "2008",
    "genres": ["Crime", "Drama", "Thriller"],
    "seasons": [
      {
        "number": 1,
        "episodes": 7
      }
    ]
  },
  "requestParams": {
    "id": "12345",
    "timestamp": "1234567890"
  }
}`,
  },
  {
    name: "NetMirror Stream",
    method: "GET",
    endpoint: "/api/netmirror/stream",
    provider: "NetMirror",
    description: "Get streaming playlist URL for a movie or episode",
    requiresAuth: true,
    parameters: [{ name: "id", type: "string", required: true, description: "Content ID for streaming" }],
    tsExample: `const response = await fetch(\`\${baseUrl}/api/netmirror/stream?id=\${id}\`, {
  method: 'GET',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

interface StreamSource {
  file: string;
  label?: string;
  type?: string;
}

interface NetMirrorStreamResponse {
  success: boolean;
  data?: {
    playlistUrl: string;
    streamData?: {
      sources: StreamSource[];
      subtitles?: Array<{
        file: string;
        label: string;
      }>;
    };
    requestParams: {
      id: string;
      timestamp: string;
      h: string;
    };
  };
}

const data: NetMirrorStreamResponse = await response.json();
console.log(data);`,
    jsExample: `fetch(\`\${baseUrl}/api/netmirror/stream?id=\${id}\`, {
  method: 'GET',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    curlExample: `curl -X GET "https://screenscapeapi.dev/api/netmirror/stream?id=12345" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    responseExample: `{
  "success": true,
  "data": {
    "playlistUrl": "https://net51.cc/playlist/12345.m3u8",
    "streamData": {
      "sources": [
        {
          "file": "https://net51.cc/videos/breaking-bad-s01e01.m3u8",
          "label": "1080p",
          "type": "hls"
        },
        {
          "file": "https://net51.cc/videos/breaking-bad-s01e01-720p.m3u8",
          "label": "720p",
          "type": "hls"
        }
      ],
      "subtitles": [
        {
          "file": "https://net51.cc/subs/breaking-bad-s01e01-en.vtt",
          "label": "English"
        }
      ]
    },
    "requestParams": {
      "id": "12345",
      "timestamp": "1234567890",
      "h": "abc123hash"
    }
  }
}`,
  },
  {
    name: "NetMirror Episodes",
    method: "GET",
    endpoint: "/api/netmirror/eps",
    provider: "NetMirror",
    description: "Get all episodes for a season, including paginated results",
    requiresAuth: true,
    parameters: [{ name: "link", type: "string", required: true, description: "Season ID, or seasonId|seriesId" }],
    tsExample: `const response = await fetch(\`\${baseUrl}/api/netmirror/eps?link=12345|67890\`, {
  method: 'GET',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

interface EpisodeLink {
  title: string;
  link: string;
}

interface NetMirrorEpisodesResponse {
  success: boolean;
  data?: {
    episodes: EpisodeLink[];
    totalEpisodes: number;
    pagesFetched: number;
    requestParams: {
      link: string;
      seasonId: string;
      seriesId: string;
      timestamp: string;
    };
  };
}

const data: NetMirrorEpisodesResponse = await response.json();
console.log(data);`,
    jsExample: `fetch(\`\${baseUrl}/api/netmirror/eps?link=12345|67890\`, {
  method: 'GET',
  headers: {
    'x-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`,
    curlExample: `curl -X GET "https://screenscapeapi.dev/api/netmirror/eps?link=12345%7C67890" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    responseExample: `{
  "success": true,
  "data": {
    "episodes": [
      {
        "title": "Episode 1",
        "link": "ep_12345"
      },
      {
        "title": "Episode 2",
        "link": "ep_12346"
      }
    ],
    "totalEpisodes": 2,
    "pagesFetched": 1,
    "requestParams": {
      "link": "12345|67890",
      "seasonId": "12345",
      "seriesId": "67890",
      "timestamp": "1711122334"
    }
  }
}`,
  },
];
