export function withPagination(res) {
  try {
    const { pagination } = res
    const hasMore = pagination.current < pagination.pageTotal
    return { ...res, hasMore }
  } catch (e) {
    console.error(e)
    return res
  }
}
