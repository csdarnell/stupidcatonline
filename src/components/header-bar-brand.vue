<template>
    <div class="navbar-brand">
        <div class="navbar-item nav-home">
            <router-link to="/home">
            <span class="stupidcat">StupidCat!</span>
            <span class="online">Online</span>
            </router-link>
        </div>
        <button
            class="link navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
        >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
        </button>
    </div>
</template>