export default {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
          icon: 'icon-home'
        }
      },
      {
        name: 'Arbitrage',
        url: '/arbitrage',
        icon: 'icon-grid',
        children:[
          {
            name: 'Simple',
            url: '/arbitrage/simple'
          }
        ]
      },
      {
        name: 'Admin',
        url: '/admin',
        icon: 'icon-settings',
        children: [
          {
            name: 'Exchanges',
            url: '/admin/exchange'
          },
          {
            name: 'Fiats',
            url: '/admin/fiat'
          },
          {
            name: 'Logs',
            url: '/admin/log'
          },
          {
            name: 'Tickers',
            url: '/admin/ticker'
          },
        ]
    }
    ]
}