
export interface EventBus{
  subscribe(event: string, callback: (...args: any[]) => Promise<any>): void
  publish(eventName: string, ...args: any[]): Promise<any>
}

export function createEventBus(): EventBus {
  const pool = new Map()

  return {
    subscribe: (key, callback) => {
      pool.set(key, callback)
    },
    publish: async(key) => {
      return await pool.get(key)()
    },
  }
}
