const cheerio = require("cheerio") // khai báo module cheerio

const request = require("request-promise") // khai báo module request-promise

// request(
//   "https://truyenqqhot.com/the-loai/action-26.html",
//   (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//       const $ = cheerio.load(html) // load HTML
//       $("li").each((index, el) => {
//         const job = $(el).find("a").text()
//         console.log(job)
//       })
//     } else {
//       console.log(error)
//     }
//   }
// )
// const link =
//   "https://mangadex.org/titles?page=1&include=391b0order=relevance.desc"
// request(link, (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html)
//     $(".manga-card").each((index, el) => {
//       const job = $(el).find("span").text()
//       console.log(job)
//     })
//   }
// })

const puppeteer = require("puppeteer")
const fs = require("fs").promises

;(async () => {
  //initiate the browser
  const browser = await puppeteer.launch()

  //create a new in headless chrome
  const page = await browser.newPage()

  //go to target website
  await page.goto(
    "https://mangadex.org/titles?page=1&include=391b0order=relevance.desc",
    {
      //wait for content to load
      waitUntil: "networkidle0"
    }
  )

  //get full page html
  const html = await page.content()
  console.log($)
  $(".manga-card ").each((index, el) => {
    const job = $(el).find("span font-bold title").text()
    console.log(job)
  })

  //store html content in the reactstorefront file
  // await fs.writeFile("test_craw_react.html", html)

  //close headless chrome
  await browser.close()
})()
