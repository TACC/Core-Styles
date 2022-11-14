To override and extend [Bootstrap Modals](https://getbootstrap.com/docs/4.3/components/modal/).

<script>
/* To open external links in new window */
Array.from(document.links)
  .filter(link => link.hostname != window.location.hostname)
  .forEach(link => link.target = '_blank');
</script>