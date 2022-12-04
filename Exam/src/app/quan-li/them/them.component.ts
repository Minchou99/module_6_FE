import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NhaXe} from "../../model/nha-xe";
import {VeXeService} from "../../service/ve-xe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-them',
  templateUrl: './them.component.html',
  styleUrls: ['./them.component.css']
})
export class ThemComponent implements OnInit {
  veXeForm: FormGroup;
  nhaXeList: NhaXe[] | undefined;

  constructor(private veXeService: VeXeService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
   this.taoForm();
    this.getNhaXeList();
  }

  getNhaXeList(){
    this.veXeService.findAllNhaXe().subscribe(data=>{
      console.log(data);
      this.nhaXeList = data;
    }, error => {
      this.veXeService.showError('Không thể lấy danh sách nhà xe!');
    });
  }

  taoForm(){
    this.veXeForm = this.formBuilder.group({
      giaVe: ['', [
        Validators.required,
        Validators.pattern('^\\d+$')
      ]],
      diemDi: ['', [
        Validators.required
      ]],
      diemDen: ['', [
        Validators.required
      ]],
      ngayKhoiHanh: ['',
        [Validators.required,
          Validators.pattern('^\\d{4}[-]\\d{2}[-]\\d{2}$'), this.kiemTraNgay]],
      gioKhoiHang: ['', [
        Validators.required,
        Validators.pattern('^(([0,1][0-9])|([2][0-4]))\\:(([0-5][0-9])|(60))$')
      ]],
      nhaXe: ['', [Validators.required]],
      soLuong: ['', [
        Validators.required,
        Validators.pattern('^\\d+$')
      ]]
    });

  }

  submit() {
    const ve = this.veXeForm.value;
    this.veXeService.saveVeXe(ve).subscribe(data => {
      this.veXeService.showSuccessNotice('Thêm mới thành công!');
      this.taoForm();
    }, error => {
      this.veXeService.showError('Thêm mới thất bại!')
    }, ()=>{
      this.router.navigateByUrl("");
    });
  }

  kiemTraNgay(abstractControl: AbstractControl): any {
    const ngayKhoiHanh = new Date(abstractControl.value).getTime();
    const hienTai = new Date().getTime();
    return (ngayKhoiHanh - hienTai > 24 * 60 * 60 * 1000) ? null : {ngayKhoiHanhKhongDung: true};
  }

}
