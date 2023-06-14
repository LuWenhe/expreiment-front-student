import {request} from "@/network/request"

export const getDynamicExpUrl = (sonUserExpObj) => {
  return request({
    method: 'POST',
    url: '/frontLesson/getDynamicExpUrl',
    data: sonUserExpObj
  })
}
