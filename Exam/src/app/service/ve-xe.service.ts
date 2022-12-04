import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VeXe} from "../model/ve-xe";
import {NhaXe} from "../model/nha-xe";
import {ToastrService} from "ngx-toastr";

const API_URL_VE = `${environment.api_ve}`;
const API_URL_NHA = `${environment.api_nha}`;

@Injectable({
  providedIn: 'root'
})
export class VeXeService {

  constructor(private httpClient: HttpClient,
              private toastrService: ToastrService) {
  }

  findAll(): Observable<VeXe[]> {
    return this.httpClient.get<VeXe[]>(API_URL_VE);
  }

  findAllNhaXe(): Observable<NhaXe[]> {
    return this.httpClient.get<NhaXe[]>(API_URL_NHA);
  }

  findById(id: number): Observable<VeXe> {
    return this.httpClient.get<VeXe>(`${API_URL_VE}/${id}`);
  }

  saveVeXe(veXe: VeXe): Observable<VeXe> {
    return this.httpClient.post<VeXe>(API_URL_VE, veXe);
  }

  search(diemDi: string, diemDen: string): Observable<VeXe[]> {
    return this.httpClient.get<VeXe[]>(API_URL_VE + `?diemDi_like=` + diemDi + `&diemDen_like=` + diemDen);
  }

  update(veXe: VeXe): Observable<VeXe> {
    return this.httpClient.patch<VeXe>(`${API_URL_VE}/${veXe.id}`, veXe);
  }

  delete(id: number, veXe: VeXe): Observable<VeXe> {
    return this.httpClient.put<VeXe>(`${API_URL_VE}/xoa/${id}`, veXe);
  }

  updateVe(id: number, veXe: VeXe): Observable<VeXe>{
    return this.httpClient.put<VeXe>(`${API_URL_VE}/sua/${id}`, veXe)
  }

  showSuccessNotice(message: string) {
    this.toastrService.success(message, 'Thông báo', {
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }

  showError(message: string) {
    this.toastrService.error(message, 'Lỗi', {
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }

  showWarning(message: string) {
    this.toastrService.warning(message, 'Cảnh báo', {
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }

}
