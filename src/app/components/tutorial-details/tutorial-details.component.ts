import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    fname: '',
    lname: '',
    username: '',
    // email: '',
    avatar: '',
  };

  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.currentTutorial = data;
        // console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateTutorial(): void {
    this.message = '';
    this.tutorialService
      .update(this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          // console.log(res);
          // this.message = res.message ? res.message : 'แก้ไขข้อมูลสำเร็จ';
          alert('แก้ไขข้อมูลสำเร็จ!');
          window.location.reload();
        },
        error: (e) => console.error(e),
      });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next: (res) => {
        // console.log(res);
        alert('ลบข้อมูลสำเร็จ!');
        window.location.reload();
      },
      error: (e) => console.error(e),
    });
  }
}
