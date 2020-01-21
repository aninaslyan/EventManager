import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  templateUrl: './events-layout.component.html',
})
export class EventsLayoutComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.router.url === '/event') {
      this.router.navigate(['/events-grid']);
    }
  }
}
