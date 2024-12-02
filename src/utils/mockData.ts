export function generateMockData() {
  return {
    cokeCount: Math.floor(Math.random() * 50) + 10,
    temperature: (Math.random() * 10 + 20).toFixed(1),
    humidity: (Math.random() * 20 + 40).toFixed(1),
    history: Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      temperature: (Math.random() * 10 + 20).toFixed(1),
      humidity: (Math.random() * 20 + 40).toFixed(1),
    })),
    events: [
      { id: 1, type: 'Restock', date: '2023-04-01', amount: 50 },
      { id: 2, type: 'Maintenance', date: '2023-04-05', description: 'Cleaned cooling system' },
      { id: 3, type: 'Restock', date: '2023-04-10', amount: 30 },
    ],
  };
}

