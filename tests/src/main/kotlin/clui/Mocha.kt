package clui

@native class Test {
    fun skip(): dynamic = noImpl
}

@native fun expect(subj: Any?): dynamic = noImpl

@native
fun it(name: String, test: Test.() -> Unit): dynamic = noImpl

@native class Suite {
    fun describe(name: String, f: Suite.()->Unit): dynamic = noImpl

    fun before(block: Test.() -> Unit): dynamic = noImpl
    fun after(block: Test.() -> Unit): dynamic = noImpl

    fun beforeEach(block: Test.() -> Unit): dynamic = noImpl
    fun afterEach(block: Test.() -> Unit): dynamic = noImpl
}

@native
fun describe(name: String, f: Suite.() -> Unit): dynamic = noImpl

fun main(args: Array<String>) {
    val testsNames = (js("Object.getOwnPropertyNames(this)") as Array<String>).filter {
        it.startsWith("test") && !it.contains('$')
    }

    for (test in testsNames) {
        js("this[test]()")
    }
}
