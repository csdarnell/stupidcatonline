<template>
    <header>
        <nav
            class="navbar has-background-dark is-dark"
            role="navigation"
            aria-label="main navigation"
        >
            <HeaderBarBrand></HeaderBarBrand>
        </nav>
    </header>
</template>


<script>
import HeaderBarBrand from '@/components/header-bar-brand';

export default {
    name: 'HeaderBar',
    components: { HeaderBarBrand },
};
</script>