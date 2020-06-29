import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {MaterialService, MaterialInstance} from "../../shared/classes/material.service";
import {interval, Observable, Subscription} from "rxjs";
import {User} from "../../shared/models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Diary} from "../../shared/models/diary";
import {DiaryService} from "../../shared/services/diary.service";
import {map, take, takeLast, tap} from "rxjs/operators";

@Component({
  selector: 'app-site-face',
  templateUrl: './site-face.component.html',
  styleUrls: ['./site-face.component.scss']
})
export class SiteFaceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('actionBtn') actionBtnEl: ElementRef
  @ViewChild('modal') modalRef: ElementRef


  public value$: Observable<number>;
  lowerOrHigh: boolean
  user$:Observable<User>
  loading = true;
  pSub: Subscription
  modal: MaterialInstance = null;
  form: FormGroup
  diaries: Diary[]
  dia1: number
  diaryId: string = null
  constructor(private auth: AuthService, private diaryService: DiaryService,
             ) {

  }

  ngOnInit(): void {
    this.user$ = this.auth.getUser()
    this.pSub = this.diaryService.fetch().subscribe(diaries => {
      this.diaries = diaries
      this.loading = false
    })

    this.form = new FormGroup({
     everyDayWeight: new FormControl(null, [Validators.required, Validators.min(0)])
    })
    this.getLastWeight()
    //this.calculateChartData()
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    this.modal.destroy()
  }
  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.actionBtnEl)
    this.modal = MaterialService.initModal(this.modalRef)
  }
onCancel() {
    this.modal.close()
    this.form.reset()
  }
  onSelectDiary(diary: Diary) {
    this.diaryId = diary._id
    this.form.patchValue({
      everyDayWeight: diary.everyDayWeight,
     })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  addDiary() {
    this.diaryId = null
    this.form.patchValue({
      everyDayWeight: null
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  removeDiary(event, diary: Diary) {
    event.stopPropagation()
    const decision = window.confirm('Вы уверены, что хотите удалить позицию?')
    if (decision) {
      this.diaryService.remove(diary._id).subscribe(
        response => {
          const idx = this.diaries.findIndex(d => d._id !== diary._id)
          this.diaries.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }
  onSubmit() {
    this.form.disable()

    const diary: Diary = {
      everyDayWeight: this.form.value.everyDayWeight,
      created: new Date(),
      lowerOrHigh: this.getLastWeight() > this.form.value.everyDayWeight ? true : false
    }

    if (this.diaryId) {
      diary._id = this.diaryId
      this.diaryService.update(diary).subscribe(
        dia => {
          const idx = this.diaries.findIndex(d => d._id === dia._id)
          this.getLastWeight()
          this.diaries[idx] = dia
          MaterialService.toast('Изменения сохранены')
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        () => {
          this.modal.close()
          this.form.reset({everyDayWeight: ''})
          this.form.enable()
        }
      )
    } else {
      this.diaryService.create(diary).subscribe(
        dia => {
          this.diaries.push(dia)
          this.getLastWeight()
          MaterialService.toast('Изменения сохранены')
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        },
        () => {
          this.modal.close()
          this.form.reset({name: '', cost: 0})
          this.form.enable()
        }
      )
    }
  }
  getLastWeight(): number{
    this.diaryService.fetch().pipe(
      takeLast(1),
      take(1)
    ).subscribe(diary => {
      diary.forEach((data) => {
         this.dia1 = data.everyDayWeight
        console.log(this.dia1)
      })
      console.log("[next] : ", diary)
    })
   return this.dia1
  }

}
