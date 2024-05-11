<script lang="ts">
	export let className: string = '';
</script>

<div class={`table-header client-table !${className} hidden text-daisyBush lg:grid`}>
	<h3>Status</h3>
	<h3>Client</h3>
	<h3 class="text-right">Received</h3>
	<h3 class="text-right">Balance</h3>
	<div />
	<div />
</div>

<style lang="postcss">
	.table-header h3 {
		@apply text-xl font-black leading-snug;
	}
</style>
