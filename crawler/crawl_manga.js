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

  for (let indexPage = 10; indexPage <= 331; indexPage++) {
    //go to target website
    await page.goto(`https://mangadex.org/titles?page=${indexPage}`, {
      //wait for content to load
      waitUntil: "networkidle0"
    })
    const manga = []

    //get full page html
    const html = await page.content()
    const $ = cheerio.load(html)
    $(".manga-card").each(async (index, el) => {
      const name = $(el).find("a.font-bold.title").text()
      const avatar = $(el).find("img.rounded").prop("src")
      const country = $(el).find("img.inline-block").prop("title")
      const stat = $(el).find(".stat.group").text().trim()
      const status = $(el).find(".tag.lift.dot").text().trim()
      const tags = []
      $(el)
        .find(".tags-row.tags")
        .each((index, val) => {
          tags.push(
            $(val)
              .find(".tag.bg-accent-lighten2")
              .text()
              .trim()
              .split("  ")
              .filter((val) => val.length > 0 && val != "\n")
              .map((val) => val.replace("\n", ""))
              .join(",")
          )
        })
      const nutshell = $(el).find(".md-md-container.dense").text().trim()
      manga.push({
        name,
        avatar,
        country,
        stat,
        status,
        tags,
        nutshell
      })
    })

    //store html content in the reactstorefront file
    await fs.writeFile(`value-${indexPage}.json`, JSON.stringify(manga))
  }

  //close headless chrome
  await browser.close()
})()
