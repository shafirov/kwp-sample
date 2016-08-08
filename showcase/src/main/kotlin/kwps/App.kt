package kwps

import kotlin.browser.document

fun main(args: Array<String>) {
    document.getElementById("content")!!.innerHTML = "<h1>Kotlin APP succesfully mounted</h1>"
}
