export default {
    items: [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
          text: 'NEW'
        }
      },
      {
        name: 'Admin',
        url: '/admin',
        icon: 'icon-puzzle',
        children: [
          {
            name: 'Exchanges',
            url: '/admin/exchange',
            icon: 'icon-puzzle'
          },
          {
            name: 'Fiats',
            url: '/admin/fiat',
            icon: 'icon-puzzle'
          },
        ]
    }
    ]
}